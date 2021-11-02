import { AbstractDao } from '../abstract.dao';
import { CharacterAttributeEntity, CharacterAttributePivotEntity } from './character.attribute.entity';
import { Attribute } from '../../model/character.model';

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

  public findAllAndPivotAttributes(attributes: Attribute[]): CharacterAttributePivotEntity[] | undefined {
    const sql = `
      SELECT 
        u.id,
        u.character_name,
        u.discord_id,
        ${attributes
          .reduce((a, attribute) => a + `SUM(c.value) FILTER ( WHERE KEY = '${attribute}') as ${attribute},`, '')
          .slice(0, -1)}
      FROM character_attribute c
      JOIN user u on c.user_id = u.id
      GROUP BY user_id
    `;
    console.log(sql);
    return this.all<CharacterAttributePivotEntity>(sql, []);
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
