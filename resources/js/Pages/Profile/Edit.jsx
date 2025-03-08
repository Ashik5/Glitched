import { useForm, usePage } from "@inertiajs/react";
import Dashboard from "../Profile/Dashboard";

export default function EditProfile() {
    const { auth } = usePage().props;
    const user = auth.user;

    const { props } = usePage();
    const { data, setData, patch, processing, errors } = useForm({
        name: user?.name || "",
        email: user?.email || "",
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
            <div className="fixed h-screen">
                <Dashboard />
            </div>

            <div className="flex-1 ml-64 overflow-y-auto h-screen">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
                    {/* Success message */}
                    {props.message && (
                        <div className="text-green-500 mb-4">
                            {props.message}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                        />
                        {errors.name && (
                            <div className="text-red-500 text-xs">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                        />
                        {errors.email && (
                            <div className="text-red-500 text-xs">
                                {errors.email}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                    >
                        {processing ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
}
