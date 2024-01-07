import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(), 
    provideAnimations(), 
    provideAnimations(), 
    importProvidersFrom(provideFirebaseApp(() => 
    initializeApp({
    "projectId":"ring-of-fire-7db2b",
    "appId":"1:617078700953:web:2217339b436df264eef108",
    "storageBucket":"ring-of-fire-7db2b.appspot.com",
    "apiKey":"AIzaSyD1LmkE6bqrqglPbcl6LRzJdkpMIrAiZ-I",
    "authDomain":"ring-of-fire-7db2b.firebaseapp.com",
    "messagingSenderId":"617078700953"
    }))), 
    importProvidersFrom(provideFirestore(() => getFirestore()))]
};
