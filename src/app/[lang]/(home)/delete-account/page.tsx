export default function DeleteAccount() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white min-h-screen">
      {/* Header */}
      <header className="text-center mb-10 pb-8 border-b-2 border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Delete Your BAZAR Account
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          You can delete your BAZAR account and all associated data directly
          from within the app.
        </p>
      </header>

      <main>
        {/* Steps */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5 border-l-4 border-blue-600 pl-4">
            Steps to delete your account:
          </h2>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 space-y-4">
            {[
              "Open the BAZAR app on your mobile device",
              "Go to Profile → Settings → Account",
              "Tap Delete Account",
              "Select a reason for leaving from the given options",
              "Confirm deletion to complete the process",
            ].map((text, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                  {idx + 1}
                </div>
                <div className="text-gray-700 text-base">
                  {text.includes("strong") ? (
                    <span dangerouslySetInnerHTML={{ __html: text }} />
                  ) : (
                    text
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="mb-10">
          <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-yellow-800 text-lg font-semibold mb-4 flex items-center">
              <span className="mr-2 text-xl">⚠️</span>
              What happens when you delete your account:
            </h3>
            <ul className="list-none space-y-2 text-yellow-800">
              <li className="relative pl-6 before:content-['⚠'] before:absolute before:left-0 before:text-yellow-500">
                Your profile information (name, email, phone number) will be
                permanently deleted
              </li>
              <li className="relative pl-6 before:content-['⚠'] before:absolute before:left-0 before:text-yellow-500">
                Your booking history, reward points, and exclusive offers will
                be erased
              </li>
              <li className="relative pl-6 before:content-['⚠'] before:absolute before:left-0 before:text-yellow-500">
                Once deleted, your account cannot be restored
              </li>
            </ul>
          </div>
        </section>

        {/* Support */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5 border-l-4 border-blue-600 pl-4">
            Request via support
          </h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <h3 className="text-blue-800 text-lg font-semibold mb-3">
              Can't access the app?
            </h3>
            <p className="text-gray-700 mb-5">
              You can also request account deletion by contacting our support
              team:
            </p>
            <a
              href="mailto:vgakwt@gmail.com"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md text-lg transition"
            >
              📩 vgakwt@gmail.com
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center mt-12 pt-8 border-t border-gray-200 text-gray-600 text-sm">
        <p>
          For any questions or concerns about account deletion, please contact
          our support team.
        </p>
      </footer>
    </div>
  );
}
