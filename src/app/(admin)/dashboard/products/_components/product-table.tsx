import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/helpers/formatCurrency";
import { ProductsWithTotalPrice } from "@/helpers/product";

export type ProductsWithTotalPriceAndCategory = ProductsWithTotalPrice & {
  category: {
    name: string;
  };
};

interface ProductTableProps {
  products: ProductsWithTotalPriceAndCategory[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Preço Total</TableHead>
          <TableHead>Preço Base</TableHead>
          <TableHead>Vendidos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.category.name}</TableCell>
            <TableCell>
              {formatCurrency({ price: product.totalPrice })}
            </TableCell>
            <TableCell>
              {formatCurrency({ price: Number(product.basePrice) })}
            </TableCell>
            <TableCell>0</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductTable;
