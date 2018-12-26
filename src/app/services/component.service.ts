import { ComponentFactoryResolver, Injectable, Inject, ViewContainerRef } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';

import { LoadingComponent } from '../components/loading/loading.component';

@Injectable()
export class ComponentService {
    private factoryResolver: ComponentFactoryResolver;
    private rootViewContainer: ViewContainerRef;

    constructor(@Inject(ComponentFactoryResolver) factoryResolver: ComponentFactoryResolver) {
        this.factoryResolver = factoryResolver;
    }

    public setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
        this.rootViewContainer = viewContainerRef;
    }

    public addComponent(component): void {
        
    }

    public remove(): void {
    }
}