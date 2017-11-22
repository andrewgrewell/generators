import Model from '../../models/Model';

const schema = {

};


class ModuleAState extends Model {
    constructor(data) {
        super(data, schema);
    }

	setBar(value2) {
		return this.set('bar', value2);
	}

	setFoo(bar) {
		return this.set('foo', bar);
	}
}


export default ModuleAState;