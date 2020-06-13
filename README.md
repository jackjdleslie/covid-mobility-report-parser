# `DEPRECATED` covid-mobility-report-parser
> Parser for Google COVID-19 Community Mobility Reports

## Overview

The [Google COVID-19 Community Mobility Reports](https://www.google.com/covid19/mobility) provide rich data about mobility 
in communites in countries with respect to different industries in response to
COVID-19 and subsequent country lockdowns. Initially this data was provided
solely in PDF format; to consume this data the PDF needed to be parsed. This
parser relies on the PDFs being converted to HTML via [pdftohtml.net](https://www.pdftohtml.net/)
and then can be passed as argument to this parser - the resulting data will be in a more useful
JSON format.

**Update**: The reports are now provided by Google in CSV format by default. This parser works at time of writing and
produces JSON, but will not be maintained going forward.

## Installation

Clone this repository and run

```
npm install
```

## Usage

1. Convert a report PDF to HTML using [pdftohtml.net](https://www.pdftohtml.net/)
2. Use the parser as following:

```
npm start <path-to-html-file>
```
