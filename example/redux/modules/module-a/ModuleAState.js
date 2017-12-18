import Model from '../../../models/Model';

const schema = {

};


class ModuleAState extends Model {
    constructor(data) {
        super(data, schema);
    }

	setStuff() {
		return this.set('stuff', true);
	}

	setFoo() {
		return this.set('foo', true);
	}
}


export default ModuleAState;