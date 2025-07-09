<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
     
        @viteReactRefresh
        @vite(['resources/sass/app.scss', 'resources/js/app.js'])
    <!--     <link  href="css/dashboard.css" rel="stylesheet" /> -->

        <style>
            #root {
              /*   display: none; */
            }
        </style>
    </head>
    <body class="">
        <div id="root" style="display: none"></div>
    </body>
    <script>
    /* window.onload = function () {
        document.getElementById('root').style.display = 'block';
    }; */
</script>
</html>
