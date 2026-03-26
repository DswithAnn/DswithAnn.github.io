'use client';

export default function NewsletterForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription logic
    console.log('Newsletter subscription submitted');
  };

  return (
    <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        className="input-field flex-1 text-sm"
        aria-label="Email address"
      />
      <button type="submit" className="btn-primary text-sm whitespace-nowrap">
        Subscribe
      </button>
    </form>
  );
}
