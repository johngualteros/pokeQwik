import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import Navbar from "~/components/shared/navbar/navbar";

export const useCheckAuthCookie = routeLoader$(({cookie, redirect}) => {
    const jwt = cookie.get('jwt');
    if(!jwt) {
        redirect(302, '/login');
    }
});

export default component$(() => {

    return (
        <>
        <Navbar />
        <h2>Layout</h2>
        <Slot />
        </>
    );
});