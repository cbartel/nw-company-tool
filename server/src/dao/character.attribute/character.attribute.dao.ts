import { AbstractDao } from '../abstract.dao';
import { CharacterAttributeEntity } from './character.attribute.entity';

export class CharacterAttributeDao extends AbstractDao {
  private static readonly INSTANCE = new CharacterAttributeDao();

  public static get(): CharacterAttributeDao {
    return CharacterAttributeDao.INSTANCE;
  }

  private constructor() {
    super();
  }

  public findByUserId(id: number): CharacterAttributeEntity[] | undefined {
    const sql = `
      SELECT * FROM character_attribute WHERE user_id = ?
    `;
    return this.all<CharacterAttributeEntity>(sql, [id]);
  }

  public put(entity: CharacterAttributeEntity): void {
    const sql = `
      REPLACE INTO
        character_attribute (user_id, key, value)
      VALUES
        (?, ?, ?)
    `;
    this.run(sql, [entity.user_id, entity.key, entity.value]);
  }

  public multiPut(entities: CharacterAttributeEntity[]): void {
    const sql = `
      REPLACE INTO
        character_attribute (user_id, key, value)
      VALUES
        (?, ?, ?)
    `;
    this.multiRun(
      sql,
      entities.map((entity) => [entity.user_id, entity.key, entity.value])
    );
  }
}
