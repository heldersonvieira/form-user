export class ProxyFactory {

    static create(model, props, action) {

        return new Proxy(model, {
            
            get: function(target, prop, receiver) {

                if (props.includes(prop) && typeof(target[prop]) == typeof(Function)) {

                    return function() {

                        // console.log(target);
                        // console.log(prop);
                        // console.log(receiver);

                        let toReturn = Reflect.apply(
                            target[prop],
                            target,
                            arguments
                        );

                        action(target);
                        return toReturn;
                    }
                }

                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {

                let toReturn = Reflect.set(target, prop, value, receiver);

                if(props.includes(prop)) {
                    action(target);
                }

                return toReturn;
            }
        })
    }


}