<?php
// Set a flag indicating that the salad API file has been included
$salad_api_file_included = true;

// Include the main index file of the salad API, using the real path to ensure correct file location
//include(realpath(__DIR__ . '/../../salad-api/public/index.php'));
include(realpath('./salad-api.php'));

// Include the MReader API file, using the real path to ensure correct file location
include(realpath('./mreader-api.php'));

// Create a new instance of the Salad Main class
$salad = new \Salad\Main(true);

// Set the configuration
$salad->config->set(\MReader\Main::setConfig());

// Handle the incoming requests
$salad->request->handle();

// Output the response, with true indicating that it should send the HTTP headers for output
echo ($salad->response->getOutput(true));

// Unset the salad instance to free up resources
unset($salad);
