/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2B4333',
                'primary-dark': '#1d2f24',
                secondary: '#C9F651',
                'secondary-dark': '#aecf2e',
                accent: '#C9F651',
                'bg-dark': '#0f172a',
                'bg-light': '#f8fafc',
                'text-dark': '#1e293b',
                'text-light': '#f8fafc',
            },
        },
    },
    plugins: [],
}
