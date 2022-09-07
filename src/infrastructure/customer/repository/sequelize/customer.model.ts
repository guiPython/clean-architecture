import {Model, Table, PrimaryKey, Column} from "sequelize-typescript"

@Table({
    tableName: "customers",
    timestamps: false
})

export default class CustomerModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @Column({allowNull: false, validate:{notEmpty: true}})
    declare name: string;

    @Column({allowNull: false, validate:{notEmpty: true}})
    declare street: string;

    @Column({allowNull: false, validate:{notEmpty: true}})
    declare number: number;

    @Column({allowNull: false, validate:{notEmpty: true}})
    declare zipcode: string;

    @Column({allowNull: false, validate:{notEmpty: true}})
    declare city: string;

    @Column({allowNull: false, validate:{notEmpty: true}})
    declare active: boolean;

    @Column({allowNull: false, validate:{notEmpty: true}})
    declare rewards: number;
}