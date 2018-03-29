#!/bin/bash

nyc --all mocha $(find test -name '*spec.js') && nyc report --reporter=html