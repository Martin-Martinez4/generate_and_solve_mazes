class PriorityQueue{
    #queue = []

    constructor(){
        // Maybe give option to start with values later
    }

    push(item){
        this.#queue.push(item);
        
        // Find the place to place the new item
        let i = this.#queue.length;
        while(i > 0){
            if(this.#queue[i].weight > this.#queue[i-1].weight){
                [this.#queue[i], this.#queue[i-1]] = [this.#queue[i-1], this.#queue[i]] 
            }

            i--;
        }
    }

    pop(){
        return this.#queue.pop();
    }

    showQueue(){
        console.log(this.#queue);
    }


}

const pq = new PriorityQueue();



