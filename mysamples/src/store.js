import { createStore } from 'redux';


export function saveToLocalStorage(state){
   try{
       const serializedState = JSON.stringify(state);
       localStorage.setItem('session', serializedState)

   }catch(e){
       console.log(e);
   }
}

export function loadFromLocalStorage(state){
    try{
        const serializedState = localStorage.getItem('session')
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
        localStorage.setItem('session', serializedState);
    }catch(e){
        console.log(e);
        return undefined
    }
 }
