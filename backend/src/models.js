import prisma from './db.js';

export class UserModel {
  static async createUser(email, passwordHash) {
    return prisma.user.create({
      data: { email, password: passwordHash }
    });
  }

  static async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  static async findById(id) {
    return prisma.user.findUnique({
      where: { id }
    });
  }

  static async updatePassword(id, passwordHash) {
    return prisma.user.update({
      where: { id },
      data: { password: passwordHash }
    });
  }
}

export class EntityModel {
  static async createEntity(type, name, description) {
    return prisma.entity.create({
      data: { type, name, description }
    });
  }

  static async getEntities() {
    return prisma.entity.findMany({
      orderBy: { id: 'asc' }
    });
  }

  static async deleteEntity(id) {
    return prisma.entity.delete({
      where: { id }
    });
  }

  static async getEntityById(id) {
    return prisma.entity.findUnique({
      where: { id }
    });
  }
}

export class LinkModel {
  static async createLink(fromId, toId, type) {
    return prisma.link.create({
      data: { fromId, toId, type }
    });
  }

  static async getLinks() {
    return prisma.link.findMany({
      orderBy: { id: 'asc' }
    });
  }

  static async deleteLink(id) {
    return prisma.link.delete({
      where: { id }
    });
  }
}

export class PasswordResetModel {
  static async createToken(userId, token, expiresAt) {
    return prisma.passwordResetToken.create({
      data: { userId, token, expiresAt }
    });
  }

  static async findByToken(token) {
    return prisma.passwordResetToken.findUnique({
      where: { token }
    });
  }

  static async deleteToken(id) {
    return prisma.passwordResetToken.delete({
      where: { id }
    });
  }
}
