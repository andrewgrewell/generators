import { Collection as BaseCollection } from 'structy';


class Collection extends BaseCollection {

    getById(id) {
        return this.items.find(i => i.getId && i.getId() === id);
    }
}


export default Collection;