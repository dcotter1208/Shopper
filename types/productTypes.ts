export type Product = {
	id: number;
	name: string;
	image: string;
	price: number;
	brand: Brand;
};

export enum Brand {
	Adidas = 'Adidas',
	AirJordan = 'Air Jordan',
	Converse = 'Converse',
	NewBalance = 'New Balance',
	Nike = 'Nike',
	Puma = 'Puma',
	Reebok = 'Reebok',
	Vans = 'Vans',
}
