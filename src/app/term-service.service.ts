import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap, switchMap} from 'rxjs/operators';
import { Term } from './term';

@Injectable({
  providedIn: 'root'
})
export class TermServiceService {

  private termsUrl:string = "http://localhost:8000/terms";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json"
    })
  }

  public tags = [];
  public index= 0;

  constructor(private http:HttpClient) { }

  getTerm(id:string):Observable<Term> {
    const url = `http://localhost:8000/term?id=${id}`;
    return this.http.get<Term>(url, this.httpOptions);
  }
  
  getTerms():Observable<any[]> {
    // to do search accepts matches for term 
    // for now other end limits response data
    return this.http.get<Term[]>(this.termsUrl);
  }

  getTermsLike(term:string):Observable<any[]> {
    term = term.trim();
    if (!term) return of([]);
    
    const url = `http://localhost:8000/terms?term=${term}`;
    return this.http.get<Term[]>(url).pipe(
      tap(_=>console.log(JSON.stringify(_)))
    );
  }

  addTerm(term:Term):Observable<any>{
    const url = `${this.termsUrl}/add`;
    return this.http.post<any>(url, [term], this.httpOptions).pipe(
      tap(_=> console.log(`Sent term ${JSON.stringify(term)}`))
    );
  }

  deleteTerm(term_id:string):Observable<any> {
    const url = `http://localhost:8000/term/delete/${term_id}`;
    return this.http.delete<any>(url, this.httpOptions).pipe(
      tap(_=>console.log(JSON.stringify(_)))
    );
  }
  
  updateTerm(term:Term):Observable<any> {
    const url = ""
    return this.http.patch<any>("http://localhost:8000/term/patch", term,this.httpOptions).pipe(
      tap(_=> console.log("sending " + JSON.stringify(_)))
    );
  }

  //// tags update 
  // tagsSubjects: Subject<any>[] = <any>[];
  // $tagsObs: Observable<any>[] = [];

  // createTag(index){
  //   this.tagsSubjects[index] = new Subject<any>();
  //   this.$tagsObs[index] = this.tagsSubjects[index].pipe();
    
  //   console.log("CREATE TAG: this.tagsSubjects ",this.tagsSubjects)
  // }

  // getTag(index){
    
  //   let inter = this.$tagsObs[index];
  //   console.log("getTag ", inter);
  //   return inter;
  // }

  updateTag(index, data){
    this.tags[index] = data;
  }

  // getSub(index){
  //   return this.tagsSubjects[index];
  // }

   

}
