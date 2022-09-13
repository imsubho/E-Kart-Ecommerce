import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartapiService {
  cartDataList:any = [];
  productList= new BehaviorSubject<any>([]);

  constructor(private http:HttpClient) { }
  // Get Product Data
  getProductData(){
    return this.productList.asObservable();
  }
//Set Product Data
  setProduct(product:any){
    this.cartDataList.push(...product);
    this.productList.next(product)
  }
//Add to Cart Details
  addToCart(product:any){
    this.cartDataList.push(product);
    this.productList.next(this.cartDataList);
    this.getTotalAmount();
    console.log(this.cartDataList)
  }
  //Get Total Amount
  getTotalAmount():Number{
    let grandTotal =0;
    this.cartDataList.map((a:any)=>{ 
      grandTotal += a.total; 
    })
    return grandTotal
  }
//Remove Cart Data one by one
  removeCartData(product:any){
    this.cartDataList.map((a:any, index:any)=>{
      if(product.id ===a.id){
        this.cartDataList.splice(index,1)
      }
    })
    this.productList.next(this.cartDataList)
  }
//Remove All Cart Data
  removeAllCart(){
    this.cartDataList =[]
    this.productList.next(this.cartDataList)
  }
}
