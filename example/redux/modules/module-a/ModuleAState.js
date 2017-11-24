import Model from '../../../models/Model';

const schema = {

};


class ModuleAState extends Model {
    constructor(data) {
        super(data, schema);
    }

	setFoo() {
		return this.set('foo', true);
	}
}


export default ModuleAState;