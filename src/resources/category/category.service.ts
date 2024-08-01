import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/commons/services/prisma.service';

@Injectable()
export class CategoryService {
  
  constructor(private readonly prismaService: PrismaService){}
  create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.category.create({
      data: createCategoryDto
    })
  }

  async findAll() {
    return this.prismaService.category.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.category.findUnique({
      where:{
        id
      }
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    //check if category exist

    const existingCategory = await this.prismaService.category.findUnique({
      where: {
        id
      }
    })
    if (!existingCategory) {
      throw new HttpException("La categorie n'existe pas !", HttpStatus.NOT_FOUND)
    }
    return this.prismaService.category.update({
      data:{
        name: updateCategoryDto.name || existingCategory.name,
        description: updateCategoryDto.description || existingCategory.description
      },
      where:{
        id
      }
    })
  }

  async remove(id: number) {
    //check if category exist

    const existingCategory = await this.prismaService.category.findUnique({
      where: {
        id
      }
    })
    if (!existingCategory) {
      throw new HttpException("Le produit n'existe pas !", HttpStatus.NOT_FOUND)
    }
    return this.prismaService.category.delete({
      where:{
        id
      }
    })
  }
}
