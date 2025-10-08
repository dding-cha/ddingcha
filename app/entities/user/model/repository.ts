import { query, queryOne } from '@/shared/lib/db/connection';
import { User, DeliveryAddress } from './types';
import { RowDataPacket } from 'mysql2';

interface UserRow extends RowDataPacket {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  phone: string | null;
  created_at: Date;
  updated_at: Date;
  last_login: Date | null;
}

interface DeliveryAddressRow extends RowDataPacket {
  id: number;
  user_id: string;
  recipient_name: string;
  phone: string;
  postal_code: string;
  address: string;
  address_detail: string | null;
  is_default: boolean;
  created_at: Date;
  updated_at: Date;
}

function mapUserRow(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    phone: row.phone || undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    lastLogin: row.last_login || undefined,
  };
}

function mapDeliveryAddressRow(row: DeliveryAddressRow): DeliveryAddress {
  return {
    id: row.id,
    userId: row.user_id,
    recipientName: row.recipient_name,
    phone: row.phone,
    postalCode: row.postal_code,
    address: row.address,
    addressDetail: row.address_detail || undefined,
    isDefault: Boolean(row.is_default),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const userRepository = {
  async findById(id: string): Promise<User | null> {
    const row = await queryOne<UserRow>(
      'SELECT id, email, name, phone, created_at, updated_at, last_login FROM users WHERE id = ?',
      [id]
    );
    return row ? mapUserRow(row) : null;
  },

  async findByEmail(email: string): Promise<User | null> {
    const row = await queryOne<UserRow>(
      'SELECT id, email, name, phone, created_at, updated_at, last_login FROM users WHERE email = ?',
      [email]
    );
    return row ? mapUserRow(row) : null;
  },

  async create(
    email: string,
    passwordHash: string,
    name: string,
    phone?: string
  ): Promise<string> {
    const id = crypto.randomUUID();
    await query(
      'INSERT INTO users (id, email, password_hash, name, phone) VALUES (?, ?, ?, ?, ?)',
      [id, email, passwordHash, name, phone || null]
    );
    return id;
  },

  async updateLastLogin(userId: string): Promise<void> {
    await query('UPDATE users SET last_login = NOW() WHERE id = ?', [userId]);
  },
};

export const deliveryAddressRepository = {
  async findByUserId(userId: string): Promise<DeliveryAddress[]> {
    const rows = await query<DeliveryAddressRow[]>(
      'SELECT * FROM delivery_addresses WHERE user_id = ? ORDER BY is_default DESC, created_at DESC',
      [userId]
    );
    return rows.map(mapDeliveryAddressRow);
  },

  async findById(id: number): Promise<DeliveryAddress | null> {
    const row = await queryOne<DeliveryAddressRow>(
      'SELECT * FROM delivery_addresses WHERE id = ?',
      [id]
    );
    return row ? mapDeliveryAddressRow(row) : null;
  },

  async findDefault(userId: string): Promise<DeliveryAddress | null> {
    const row = await queryOne<DeliveryAddressRow>(
      'SELECT * FROM delivery_addresses WHERE user_id = ? AND is_default = true',
      [userId]
    );
    return row ? mapDeliveryAddressRow(row) : null;
  },

  async create(
    userId: string,
    data: {
      recipientName: string;
      phone: string;
      postalCode: string;
      address: string;
      addressDetail?: string;
      isDefault?: boolean;
    }
  ): Promise<number> {
    // If setting as default, unset other default addresses
    if (data.isDefault) {
      await query(
        'UPDATE delivery_addresses SET is_default = false WHERE user_id = ?',
        [userId]
      );
    }

    const result = await query<any>(
      `INSERT INTO delivery_addresses
      (user_id, recipient_name, phone, postal_code, address, address_detail, is_default)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        data.recipientName,
        data.phone,
        data.postalCode,
        data.address,
        data.addressDetail || null,
        data.isDefault || false,
      ]
    );

    return result.insertId;
  },

  async update(
    id: number,
    userId: string,
    data: {
      recipientName?: string;
      phone?: string;
      postalCode?: string;
      address?: string;
      addressDetail?: string;
      isDefault?: boolean;
    }
  ): Promise<void> {
    // If setting as default, unset other default addresses
    if (data.isDefault) {
      await query(
        'UPDATE delivery_addresses SET is_default = false WHERE user_id = ? AND id != ?',
        [userId, id]
      );
    }

    const updates: string[] = [];
    const values: any[] = [];

    if (data.recipientName !== undefined) {
      updates.push('recipient_name = ?');
      values.push(data.recipientName);
    }
    if (data.phone !== undefined) {
      updates.push('phone = ?');
      values.push(data.phone);
    }
    if (data.postalCode !== undefined) {
      updates.push('postal_code = ?');
      values.push(data.postalCode);
    }
    if (data.address !== undefined) {
      updates.push('address = ?');
      values.push(data.address);
    }
    if (data.addressDetail !== undefined) {
      updates.push('address_detail = ?');
      values.push(data.addressDetail);
    }
    if (data.isDefault !== undefined) {
      updates.push('is_default = ?');
      values.push(data.isDefault);
    }

    if (updates.length > 0) {
      values.push(id, userId);
      await query(
        `UPDATE delivery_addresses SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`,
        values
      );
    }
  },

  async delete(id: number, userId: string): Promise<void> {
    await query('DELETE FROM delivery_addresses WHERE id = ? AND user_id = ?', [
      id,
      userId,
    ]);
  },

  async setDefault(id: number, userId: string): Promise<void> {
    // Unset all default addresses for this user
    await query(
      'UPDATE delivery_addresses SET is_default = false WHERE user_id = ?',
      [userId]
    );

    // Set the specified address as default
    await query(
      'UPDATE delivery_addresses SET is_default = true WHERE id = ? AND user_id = ?',
      [id, userId]
    );
  },
};
