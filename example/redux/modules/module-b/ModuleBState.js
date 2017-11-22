import Model from '../../models/Model';

const schema = {

};


class ModuleBState extends Model {
    constructor(data) {
        super(data, schema);
    }

    getFoo() {
        return this.foo;
    }
}


export default ModuleBState;
