import { ServiceInterceptor } from './service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';

@Injectable()
export class UserService {
    constructor(private http: HttpClient, public service: ServiceInterceptor) { }

    getAll() {
        return this.http.get<User[]>(`${this.service.endpoint}/users`);
    }

    getById(id: number) {
        return this.http.get(`${this.service.endpoint}/users/` + id);
    }

    register(user: User) {
        return this.http.post(`${this.service.endpoint}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${this.service.endpoint}/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.service.endpoint}/users/` + id);
    }
}
