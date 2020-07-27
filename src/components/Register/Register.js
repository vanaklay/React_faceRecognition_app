import React, { useState } from 'react';

const Register = ({ onRouteChange, loadUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitForm = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user) {
        loadUser(user);
        onRouteChange('home');
      }
    })
  };
    return (
        <article className="center br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5">
        <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">S'inscrire</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Nom</label>
              <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="text" name="name"  id="name"
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="email" name="email-address"  id="email-address"
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Mot de passe</label>
              <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" name="password"  id="password" 
                onChange={e => setPassword(e.target.value)}
                />
            </div>
          </fieldset>
          <div className="">
            <input 
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
              type="submit" value="S'inscrire" onClick={onSubmitForm}/>
          </div>
        </form>
      </main>
      </article>
    );
};

export default Register;