import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage, useForm, Link } from '@inertiajs/inertia-react';

export default function Dashboard(props) {
    const { pokemons } = usePage().props

    function destroy(e) {
        if (confirm("Are you sure you want to delete this Pokemon?")) {
            Inertia.delete(route("pokemons.destroy", e.currentTarget.id));
        }
    }

    const { data, setData, errors, post } = useForm({
        title: "",
        description: "",
    });

    function handleUpload(e) {
        e.preventDefault();
        post(route("pokemons.upload"));
        setData("attachment", "");
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            message={props.message}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pokemons</h2>}
        >
            <Head title="Pokemons" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form name="uploadForm" onSubmit={handleUpload}>
                                <span className="text-red-600">
                                    {errors.attachment}
                                </span>
                                <div className="flex items-center justify-between mb-6">
                                
                                    <input
                                        type="file"
                                        className="w-full px-4 py-2"
                                        label="File"
                                        name="attachment"
                                        onChange={(e) =>
                                            setData("attachment", e.target.files[0])
                                        }
                                    />
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Upload
                                    </button>
                                    
                                </div>
                                
                            </form>
                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 w-20">Id</th>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Weight</th>
                                        <th className="px-4 py-2">Height</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pokemons.map(({ id, name, weight, height }) => (
                                        <tr>
                                            <td className="border px-4 py-2">{ id }</td>
                                            <td className="border px-4 py-2">{ name }</td>
                                            <td className="border px-4 py-2">{ weight }</td>
                                            <td className="border px-4 py-2">{ height }</td>
                                            <td className="border px-4 py-2">
                                                <Link
                                                    tabIndex="1"
                                                    className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                    href={route("pokemons.edit", id)}
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={destroy}
                                                    id={id}
                                                    tabIndex="-1"
                                                    type="button"
                                                    className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {pokemons.length === 0 && (
                                        <tr>
                                            <td
                                                className="px-6 py-4 border-t"
                                                colSpan="4"
                                            >
                                                No pokemons found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
