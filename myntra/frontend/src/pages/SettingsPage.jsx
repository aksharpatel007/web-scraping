const SettingsPage = () => (
    <section className="page-container py-12">
        <h1 className="font-serif text-4xl">Settings</h1>
        <div className="glass-panel mt-7 max-w-2xl rounded-2xl p-6">
            <h2 className="text-xl">Account Preferences</h2>
            <div className="mt-4 grid gap-3">
                <label className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3 text-sm">
                    Email Notifications
                    <input type="checkbox" defaultChecked />
                </label>
                <label className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3 text-sm">
                    SMS Alerts
                    <input type="checkbox" />
                </label>
                <label className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3 text-sm">
                    Dark Luxury Theme
                    <input type="checkbox" defaultChecked />
                </label>
            </div>
        </div>
    </section>
);

export default SettingsPage;
