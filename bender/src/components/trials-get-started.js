import React, { Component } from 'react'
import { Link } from 'react-router'

export default class TrialsGetStarted extends Component {
  render () {
    return (
      <div className='getstarted'>
        <h3 className='no-trials'>
          Get Started With Bender.
        </h3>
        <br />
        <h4>{"1. Install Bender\' Python Client"}</h4>
        <div className='snippet'>
          {"pip install bender"}
        </div>
        <h4>{"2. Load your experiment"}</h4>
        <div className='snippet'>
          {"from bender import Bender"}
          <br />
          {"bender = Bender(author='yourname@rythm.co', experiment=<EXPERIMENT ID>)"}
        </div>
        <h4>{"3. Create an Algo"}</h4>
        <div className='snippet'>
          {"bender.algo.create(name='RandomForest', parameters=['n_estimators', 'criterion'])"}
        </div>
        <h4>{"4. Send a trial"}</h4>
        <div className='snippet'>
           {"bender.trial.new(parameters={'n_estimators': 30, 'criterion': 'gini'} results={'accuracy': 0.877} comment='not bad')"}
        </div>
        More help and usage examples <Link to={'/help'}>here</Link>.
      </div>
    )
  }
}
