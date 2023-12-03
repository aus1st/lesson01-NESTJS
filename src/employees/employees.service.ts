/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { async } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}
 async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto
    })
  }

 async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if(role) return this.databaseService.employee.findMany({where: {role}})
    return this.databaseService.employee.findMany();  
  }

 async findOne(id: number) {
    return this.databaseService.employee.findUnique({where: {id}})
  }

async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
   const employee = await this.databaseService.employee.findUnique({where: {id}})
   if(!employee) { return new NotFoundException('Employee not found') }
   else {
    this.databaseService.employee.update({
      where: {id,},
      data: updateEmployeeDto,
    })
   }

  }

 async remove(id: number) {
    return this.databaseService.employee.delete({where: {id}})
  }
}
