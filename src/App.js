import React, { Component } from 'react';

const h3 = title => <h3>{title}</h3>
const main = title => <main>{title}</main>
const app = () => 
  <main>
    {h3('hellow')}
  </main>


export default app;