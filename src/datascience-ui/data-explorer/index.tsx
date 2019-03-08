// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';
import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MainPanel } from './mainPanel';

ReactDOM.render(
  <MainPanel />,
  document.getElementById('root') as HTMLElement
);
