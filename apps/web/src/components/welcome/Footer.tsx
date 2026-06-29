export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-border px-6 py-8 text-center">
      <p className="text-sm text-text-secondary">
        © {year}{' '}
        <span className="text-text-primary">最喜欢真真的小陈</span>
        {' · '}
        <span className="text-xs opacity-60">xzzcy.com</span>
      </p>
    </footer>
  )
}
