import React from 'react';

export default function VerifyPage() {
  return (
    <section className="section auth">
      <div className="container">
        <h1>Welcome!</h1>
        <p>You have successfully registered a new account.</p>
        <p>We've sent you an email. Please click on the verification link to verify your account.</p>
        <p>Once you have successfully verified yourself. Proceed to <a href="/login">Log in</a></p>
      </div>
    </section>
  )
}
