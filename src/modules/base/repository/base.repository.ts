import { Injectable } from '@nestjs/common';
import { Sequelize, Model } from 'sequelize-typescript';


export class BaseRepository<T extends Model<T>> {
    private model: any;
  
    constructor(model: any) {
      this.model = model;
    }
  
    async findAll(): Promise<T[]> {
      return await this.model.findAll();
    }
  
    async findById(id: number): Promise<T> {
      return await this.model.findByPk(id);
    }
    
    async create<CreateType>(entity: CreateType): Promise<CreateType> {
      return await this.model.create(entity);
    }
  
    async update<UpdateType>(id: number, entity: UpdateType): Promise<[number, T[]]> {
      return await this.model.update(entity, { where: { id } });
    }
  
    async delete(id: number): Promise<number> {
      return await this.model.destroy({ where: { id } });
    }
  }