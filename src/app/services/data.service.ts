import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {
    constructor(private http: Http) {
    }

    private map(res: Response) {
        return res.json() || {};
    }

    public get(url: string) {
        return this.http.get(url).pipe(map(this.map));
    }

    public post(url: string, data: any) {
        return this.http.post(url, data).pipe(map(this.map));
    }

    public put(url: string, data: any) {
        return this.http.put(url, data).pipe(map(this.map));
    }
}