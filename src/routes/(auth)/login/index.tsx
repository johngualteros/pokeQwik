import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';
import { Form, routeAction$, zod$, z } from '@builder.io/qwik-city';

export const useLoginUserAction = routeAction$((data, event) => {
    const {email, password} = data;

    if(email === 'john@google.com' && password === '123456') {
        const jwt = '1234567890';
        event.cookie.set('jwt', jwt, { secure: true, path: '/' });
        event.redirect(302, '/');
        return {
            success: true,
            jwt: jwt,
        }
    }

    return {
        success: false,
        error: 'Invalid credentials',
    }
}, zod$({
    email: z.string().email(),
    password: z.string().min(6),
}));

export default component$(() => {

    useStylesScoped$(styles);

    const action = useLoginUserAction();

    return (
        <Form class="login-form mt-10" action={action}>
            <div class="relative">
                <input name="email" type="text" placeholder="Email address" />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input id="password" name="password" type="password" placeholder="Password" />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button>Ingresar</button>
            </div>


            {/* <code>
                { JSON.stringify( formState, undefined , 2 ) }
            </code> */}
        </Form>
    )
});