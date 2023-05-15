import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbCollapse, NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbPaginationModule
} from "@ng-bootstrap/ng-bootstrap";
import { PagerHeaderComponent } from './components/paging/pager-header/pager-header.component';
import { PagerComponent } from './components/paging/pager/pager.component';
import { SearchComponent } from './components/search/search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterLink, RouterLinkActive} from "@angular/router";
import { TextContentPlaceholderComponent } from './components/placeholders/text-content-placeholder/text-content-placeholder.component';
import {TabComponent} from "./components/tabs/tab/tab.component";
import { TextAutoPlaceholderComponent } from './components/placeholders/text-auto-placeholder/text-auto-placeholder.component';
import { CirclePlaceholderComponent } from './components/placeholders/circle-placeholder/circle-placeholder.component';
import { ShoppingCardIconComponent } from './components/icons/shopping-card-icon/shopping-card-icon.component';
import { LinkComponent } from './components/link/link.component';
import { PlusIconComponent } from './components/icons/plus-icon/plus-icon.component';
import { MinusIconComponent } from './components/icons/minus-icon/minus-icon.component';
import { TrashIconComponent } from './components/icons/trash-icon/trash-icon.component';
import { IncreaseProductsInBasketDirective } from './directives/increase-products-in-basket.directive';
import { DecreaseProductsInBasketDirective } from './directives/decrease-products-in-basket.directive';
import { RemoveProductsInBasketDirective } from './directives/remove-products-in-basket.directive';
import { PrimaryButtonComponent } from './components/buttons/primary-button/primary-button.component';
import { FormInputComponent } from './components/inputs/form-input/form-input.component';
import { SelectComponent } from './components/select/select.component';
import { ImagePlaceholderComponent } from './components/placeholders/image-placeholder/image-placeholder.component';
import { CardComponent } from './components/cards/card/card.component';
import {CardSkeletonComponent} from "./components/cards/card-skeleton/card-skeleton.component";
import { PagerHeaderSkeletonComponent } from './components/paging/pager-header-skeleton/pager-header-skeleton.component';
import { CollectionContainerComponent } from './components/collection-container/collection-container.component';
import { TabSkeletonComponent } from './components/tabs/tab-skeleton/tab-skeleton.component';
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";
import {BreadcrumbModule} from "xng-breadcrumb";
import {BreadcrumbComponent} from "./components/breadcrumb/breadcrumb.component";
import { HistoryIconComponent } from './components/icons/history-icon/history-icon.component';
import { SignOutIconComponent } from './components/icons/sign-out-icon/sign-out-icon.component';
import { RegisterFormEmailInputComponent } from './components/inputs/register-form-email-input/register-form-email-input.component';
import { RegisterFormUsernameInputComponent } from './components/inputs/register-form-username-input/register-form-username-input.component';
import { PasswordInputComponent } from './components/inputs/password-input/password-input.component';
import { LoginFormEmailInputComponent } from './components/inputs/login-form-email-input/login-form-email-input.component';
import { LoaderIconComponent } from './components/icons/loader-icon/loader-icon.component';
import { SubmitFormButtonComponent } from './components/buttons/submit-form-button/submit-form-button.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ErrorInterceptor} from "./interceptors/error.interceptor";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { DropdownItemComponent } from './components/dropdown-item/dropdown-item.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ArrowIconComponent } from './components/icons/arrow-icon/arrow-icon.component';
import { SearchInputComponent } from './components/inputs/search-input/search-input.component';
import { ShopIconComponent } from './components/icons/shop-icon/shop-icon.component';


@NgModule({
  declarations: [
    PagerHeaderComponent,
    PagerComponent,
    SearchComponent,
    TextContentPlaceholderComponent,
    TabComponent,
    TextAutoPlaceholderComponent,
    CirclePlaceholderComponent,
    ShoppingCardIconComponent,
    LinkComponent,
    PlusIconComponent,
    MinusIconComponent,
    TrashIconComponent,
    IncreaseProductsInBasketDirective,
    DecreaseProductsInBasketDirective,
    RemoveProductsInBasketDirective,
    PrimaryButtonComponent,
    FormInputComponent,
    SelectComponent,
    ImagePlaceholderComponent,
    CardComponent,
    CardSkeletonComponent,
    PagerHeaderSkeletonComponent,
    CollectionContainerComponent,
    TabSkeletonComponent,
    NavBarComponent,
    BreadcrumbComponent,
    HistoryIconComponent,
    SignOutIconComponent,
    RegisterFormEmailInputComponent,
    RegisterFormUsernameInputComponent,
    PasswordInputComponent,
    LoginFormEmailInputComponent,
    LoaderIconComponent,
    SubmitFormButtonComponent,
    DropdownItemComponent,
    DropdownComponent,
    ArrowIconComponent,
    SearchInputComponent,
    ShopIconComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    FormsModule,
    FontAwesomeModule,
    RouterLink,
    BreadcrumbModule,
    NgbCollapse,
    RouterLinkActive,
    NgbDropdownMenu,
    NgbDropdownItem,
    NgbDropdownToggle,
    NgbDropdown,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  exports: [
    NgbPaginationModule,
    PagerHeaderComponent,
    PagerComponent,
    SearchComponent,
    TextContentPlaceholderComponent,
    TabComponent,
    TextAutoPlaceholderComponent,
    CirclePlaceholderComponent,
    ShoppingCardIconComponent,
    LinkComponent,
    PlusIconComponent,
    MinusIconComponent,
    TrashIconComponent,
    IncreaseProductsInBasketDirective,
    DecreaseProductsInBasketDirective,
    RemoveProductsInBasketDirective,
    PrimaryButtonComponent,
    FormInputComponent,
    SelectComponent,
    ImagePlaceholderComponent,
    CardComponent,
    CardSkeletonComponent,
    PagerHeaderSkeletonComponent,
    CollectionContainerComponent,
    TabSkeletonComponent,
    NavBarComponent,
    BreadcrumbComponent,
    RegisterFormEmailInputComponent,
    RegisterFormUsernameInputComponent,
    PasswordInputComponent,
    LoginFormEmailInputComponent,
    SubmitFormButtonComponent
  ]
})
export class CoreModule { }
