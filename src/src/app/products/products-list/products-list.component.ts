import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../core/models/product";
import {Pagination} from "../../core/models/pagination";
import {IProductsFiltering} from "../../core/services/product/products-filtering";
import {ProductsService} from "../../core/services/product/products.service";
import {BrandsService} from "../../core/services/product/brands.service";
import {ProductTypesService} from "../../core/services/product/product-types.service";
import {PlaceholderSize} from "../../core/components/placeholders/text-content-placeholder/placeholder-size";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent{
  products: IProduct[] | null = null;
  brandFilters: string[] | null = null;
  productTypeFilters: string[] | null = null;
  isLoading: boolean = true;

  productsTotalCount: number | null = null;
  pageSize: number = 6;
  currentPage: number = 1;
  productSearch?: string;

  selectedBrand: string = 'All';
  selectedProductType: string = 'All';
  selectedSorting: string = '+name';
  sortings = [
    {displayName: 'Alphabetical', value: '+name'},
    {displayName: 'Price Low To High', value: '+price'},
    {displayName: 'Price High To Low', value: '-price'}
  ];

  get sortingDisplayNames(): string[] {
    return this.sortings.map(s => s.displayName);
  }

  mapSortings(displayName: string): string {
    return this.sortings.find(s => s.displayName === displayName)?.value ?? '+name';
  }

  constructor(private productsService: ProductsService, private brandsService: BrandsService, private productTypesService: ProductTypesService) {
    brandsService.fetch().subscribe(value => {
      this.brandFilters = ['All', ...value];
    })
    productTypesService.fetch().subscribe(value => {
      this.productTypeFilters = ['All', ...value];
    })
    this.fetchProducts();
  }

  fetchProducts(){
    const productType: undefined | string = this.selectedProductType === 'All' ? undefined : this.selectedProductType;
    const brand: undefined | string = this.selectedBrand === 'All' ? undefined : this.selectedBrand;

    const pagination: Pagination = Pagination.fromCurrentPagePageSize(this.currentPage, this.pageSize);

    const filtering: IProductsFiltering = {
      productType: productType,
      brand: brand,
      searching: this.productSearch
    };

    this.isLoading = true;
    this.productsService.fetchProducts(pagination, filtering, [this.selectedSorting])
      .subscribe(value => {
        this.products = value.products;
        this.productsTotalCount = value.total;
        this.isLoading = false;
      });
  }

  reset(){
    this.currentPage = 1;
    // this.products = null;
    // this.productsTotalCount = null;
  }

  onBrandChange(brand: string){
    this.reset();

    this.selectedBrand = brand;
    this.fetchProducts();
  }

  onProductTypeChange(productType: string){
    this.reset();

    this.selectedProductType = productType;
    this.fetchProducts();
  }

  onSortingChange($event: string){
    this.reset();

    this.selectedSorting = this.mapSortings($event);
    this.fetchProducts();
  }

  onSearchChange(newProductSearch?: string){
    this.reset();

    this.productSearch = newProductSearch;
    this.fetchProducts();
  }

  onPageChange(newPage: number){
    // this.products = null;

    this.currentPage = newPage;
    this.fetchProducts();
  }

  protected readonly Array = Array;
}
