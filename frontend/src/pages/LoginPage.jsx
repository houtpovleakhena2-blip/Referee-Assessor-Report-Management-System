import { Lock, ShieldCheck, UserRound } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: 'admin',
      password: 'password',
    },
  })

  const onSubmit = (data) => {
    login({ name: data.username, role: 'Administrator' }, 'demo-token')
    navigate('/dashboard')
  }

  return (
    <main className="login-page">
      <section className="login-panel modern-login">
        <div className="login-intro">
          <div className="login-badge">
            <ShieldCheck size={18} />
            <span>Secure Assessor Portal</span>
          </div>
          <div>
            <h1>Welcome back</h1>
            <p>
              Sign in to manage referee assessments, match reports, and performance reviews.
            </p>
          </div>
          <div className="login-highlights">
            <span>Live match records</span>
            <span>Assessment reports</span>
            <span>Referee scoring</span>
          </div>
        </div>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-heading">
            <span>Referee Assessor Report Management System</span>
            <h2>Login</h2>
          </div>

          <label>
            Username
            <div className="input-with-icon">
              <UserRound size={18} />
              <input
                {...register('username', { required: true })}
                placeholder="Enter username"
              />
            </div>
          </label>

          <label>
            Password
            <div className="input-with-icon">
              <Lock size={18} />
              <input
                {...register('password', { required: true })}
                type="password"
                placeholder="Enter password"
              />
            </div>
          </label>

          <button className="primary-button login-submit" type="submit">
            Login
          </button>
        </form>
      </section>
    </main>
  )
}
