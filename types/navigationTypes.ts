import { ParamListBase } from '@react-navigation/native';

export type StackParamList = ParamListBase & {
	AllProducts: undefined;
	ProductDetail: { productId: number };
	Cart: undefined;
};
