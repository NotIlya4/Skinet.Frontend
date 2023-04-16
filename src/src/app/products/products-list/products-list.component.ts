import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../shared/models/product";
import {Pagination} from "../../shared/models/pagination";
import {IProductsFiltering} from "../../shared/services/products-service/products-filtering";
import {ProductsService} from "../../shared/services/products-service/products.service";
import {BrandsService} from "../../shared/services/brands.service";
import {ProductTypesService} from "../../shared/services/product-types.service";
import {PlaceholderSize} from "../../shared/components/placeholders/text-content-placeholder/placeholder-size";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit{
  products?: IProduct[];
  brandFilters?: string[];
  productTypeFilters?: string[];

  productsTotalCount?: number;
  pageSize: number = 6;
  currentPage: number = 1;
  productSearch?: string;

  selectedBrand: string = 'All';
  selectedProductType: string = 'All';
  selectedSorting: string = '+name';
  sortingsMapping = [
    {name: 'Alphabetical', value: '+name'},
    {name: 'Price Low To High', value: '+price'},
    {name: 'Price High To Low', value: '-price'}
  ];

  getSortingMappingsAsStrings(): string[] {
    return this.sortingsMapping.map(s => s.name);
  }

  constructor(private productsService: ProductsService, private brandsService: BrandsService, private productTypesService: ProductTypesService) {

  }

  ngOnInit(){
    this.getProducts();
    this.getBrandFilters();
    this.getProductTypeFilters();
  }

  getProducts(){
    const productType: undefined | string = this.selectedProductType === 'All' ? undefined : this.selectedProductType;
    const brand: undefined | string = this.selectedBrand === 'All' ? undefined : this.selectedBrand;

    const pagination: Pagination = Pagination.fromCurrentPagePageSize(this.currentPage, this.pageSize);

    const filtering: IProductsFiltering = {
      productType: productType,
      brand: brand,
      searching: this.productSearch
    };

    this.productsService.getProducts(pagination, filtering, [this.selectedSorting])
      .subscribe(value => {
        this.products = value.products;
        this.productsTotalCount = value.total;
      });
  }

  getBrandFilters(){
    this.brandsService.get().subscribe(brands => {
      this.brandFilters = ['All', ...brands];
    })
  }

  getProductTypeFilters(){
    this.productTypesService.get().subscribe(productTypes => {
      this.productTypeFilters = ['All', ...productTypes];
    })
  }

  reset(){
    this.currentPage = 1;
    this.products = undefined;
    this.productsTotalCount = undefined;
  }

  onBrandSelected(brand: string){
    this.reset();

    this.selectedBrand = brand;
    this.getProducts();
  }

  onProductTypeSelected(productType: string){
    this.reset();

    this.selectedProductType = productType;
    this.getProducts();
  }

  onSortingChanged($event: string){
    this.reset();

    this.selectedSorting = this.sortingsMapping.find(s => s.name === $event)!.value;
    this.getProducts();
  }

  onSearchClicked(newProductSearch?: string){
    this.reset();

    this.productSearch = newProductSearch;
    this.getProducts();
  }

  onPageChanged(newPage: number){
    this.products = undefined;

    this.currentPage = newPage;
    this.getProducts();
  }

  protected readonly PlaceholderSize = PlaceholderSize;
}
