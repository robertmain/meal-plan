import { Test, TestingModule } from '@nestjs/testing';
import { Repository, FindManyOptions, DeepPartial } from 'typeorm';
import {
  Mock,
  IMock,
  It,
  MockBehavior,
} from 'typemoq';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { BaseEntity, BaseService } from '.';

type Entity = BaseEntity & { name: string };
const mockEntity: Entity = {
  id: '17b89e2b-63a1-456d-9b37-0320913b7e94',
  updatedAt: new Date(),
  createdAt: new Date(),
  deletedAt: null,
  name: 'Fubar',
};

const excludeDeleted = { deletedAt: null };

describe('Base Service', (): void => {
  let service: BaseService<Entity>;
  let repository: IMock<Repository<Entity>>;

  beforeEach(async (): Promise<void> => {
    repository = Mock.ofType<Repository<Entity>>(
      Repository,
      MockBehavior.Strict
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BaseService,
          useFactory: (): BaseService<Entity> => {
            class Service extends BaseService<Entity> { }
            return new Service(repository.target);
          },
        },
      ],
    }).compile();

    service = module.get<BaseService<Entity>>(BaseService);
  });
  describe('findById', (): void => {
    it('retrives one or more entities by ID', async (): Promise<void> => {
      repository.setup((mockRepo): Promise<Entity[]> => mockRepo
        .findByIds(It.isValue([mockEntity.id]), It.isAny()))
        .returns((): Promise<Entity[]> => Promise.resolve([mockEntity]))
        .verifiable();

      const ingredient = await service.findById([mockEntity.id]);

      expect(ingredient).toBeTruthy();
    });
    it('omits deleted entities from query results', async (): Promise<void> => {
      repository.setup((mockRepo): Promise<Entity[]> => mockRepo
        .findByIds(It.isAny(), It.isObjectWith({ where: excludeDeleted })))
        .returns((): Promise<Entity[]> => Promise.reject(
          new EntityNotFoundError(BaseEntity, excludeDeleted)
        ))
        .verifiable();

      await expect(service.findById([mockEntity.id])).rejects
        .toThrowError(EntityNotFoundError);
    });
    it('can be overridden to return deleted entities', async (): Promise<void> => {
      repository.setup((mockRepo): Promise<Entity[]> => mockRepo
        .findByIds(It.isAny(), It.isObjectWith({ where: {} })))
        .returns((): Promise<Entity[]> => Promise.resolve([mockEntity]))
        .verifiable();

      await expect(service.findById([mockEntity.id], true))
        .resolves.toBeTruthy();
    });
    it('allows custom find options to be passed to the repository', async (): Promise<void> => {
      const options: FindManyOptions<Entity> = {
        relations: [],
      };

      repository.setup((mockRepo): Promise<Entity[]> => mockRepo
        .findByIds(It.isAny(), It.isObjectWith({ ...options })))
        .returns((): Promise<Entity[]> => Promise.resolve([]))
        .verifiable();

      await service.findById([mockEntity.id], undefined, options);
    });
  });
  describe('findAll', (): void => {
    it('returns all non-deleted entities', async (): Promise<void> => {
      repository.setup((mockRepo): Promise<Entity[]> => mockRepo
        .find(It.isValue({ where: excludeDeleted })))
        .returns((): Promise<Entity[]> => Promise.resolve(
          new Array(10).fill(mockEntity)
        ))
        .verifiable();

      const entities = await service.findAll();

      expect(entities).toHaveLength(10);
    });
    it('omits deleted entities from query results', async (): Promise<void> => {
      repository.setup((mockRepo): Promise<Entity[]> => mockRepo
        .find(It.isValue({ where: excludeDeleted })))
        .returns((): Promise<Entity[]> => Promise.resolve([]))
        .verifiable();

      await service.findAll();
    });
    it('can be overridden to return deleted entities', async (): Promise<void> => {
      repository.setup((mockRepo): Promise<Entity[]> => mockRepo
        .find(It.isValue({ where: {} })))
        .returns((): Promise<Entity[]> => Promise.resolve([]))
        .verifiable();

      await service.findAll(true);
    });
    it('allows custom find options to be passed to the repository', async (): Promise<void> => {
      const options: FindManyOptions<Entity> = {
        relations: [],
      };

      repository.setup((mockRepo): Promise<Entity[]> => mockRepo
        .find(It.isValue({
          where: excludeDeleted,
          relations: options.relations,
        })))
        .returns((): Promise<Entity[]> => Promise.resolve([]))
        .verifiable();

      await service.findAll(undefined, options);
    });
  });
  describe('save', (): void => {
    it('writes new entities to the database', async (): Promise<void> => {
      const newEntity: DeepPartial<Entity> = {
        name: mockEntity.name,
      };

      repository.setup((mockRepo): Promise<DeepPartial<Entity>[]> => mockRepo
        .save(It.isValue([newEntity])))
        .returns((): Promise<Entity[]> => Promise.resolve([mockEntity]))
        .verifiable();

      await service.save([newEntity]);
    });

    it('updates existing entities in the database', async (): Promise<void> => {
      const existingEntity: DeepPartial<Entity> = {
        id: mockEntity.id,
        name: mockEntity.name,
      };

      repository.setup((mockRepo): Promise<DeepPartial<Entity>[]> => mockRepo
        .save(It.isValue([existingEntity])))
        .returns((): Promise<Entity[]> => Promise.resolve([mockEntity]))
        .verifiable();

      await service.save([existingEntity]);
    });

    it('returns updated entites after saving', async (): Promise<void> => {
      const existingEntity: DeepPartial<Entity> = {
        id: mockEntity.id,
        name: mockEntity.name,
      };

      repository.setup((mockRepo): Promise<DeepPartial<Entity>[]> => mockRepo
        .save(It.isAny()))
        .returns((): Promise<Entity[]> => Promise.resolve([mockEntity]))
        .verifiable();

      const results = await service.save([existingEntity]);

      expect(results).toBeTruthy();
      expect(results).toBeInstanceOf(Array);
    });
  });
});
