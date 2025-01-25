import React from 'react';
import { User, Edit as edit, ChevronRight } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function Edit(props) {
  const favorites = [
    {
      title: "Marvel Rivals",
      image: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "Red Dead Redemption 2",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "Fortnite",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400",
    },
  ];

  const posts = [
    {
      title: "13 Exciting Games Kicking Off The New Year in January",
      game: "Fortnite",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "13 Exciting Games Kicking Off The New Year in January",
      game: "Red Dead Redemption 2",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "13 Exciting Games Kicking Off The New Year in January",
      game: "Counter Strike 2",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
      {/* Profile Section */}
      <div className="container mx-auto px-4 pt-24 bg-[#1a1b2e] text-white">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-gray-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-2xl font-bold">ANTIK DHAR</h2>
              <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">BIO</span>
            </div>
            <div className="flex gap-8 text-gray-400">
              <span>Posts: 18</span>
              <span>Followers: 358</span>
              <span>Following: 200</span>
            </div>
            <button className="flex items-center gap-2 mt-3 text-blue-500 hover:text-blue-400">
              <edit className="w-4 h-4" />
              edit Profile
            </button>
          </div>
        </div>

        {/* Favorites Section */}
        <section className="mb-12">
          <h3 className="text-xl font-bold mb-6">Favourites</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {favorites.map((game, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden group">
                <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h4 className="text-lg font-semibold">{game.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Posts Section */}
        <section>
          <h3 className="text-xl font-bold mb-6">My Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <div key={index} className="bg-[#252538] rounded-lg overflow-hidden group cursor-pointer">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <span className="text-sm text-gray-400">{post.game}</span>
                  <h4 className="text-lg font-semibold mt-1 group-hover:text-blue-500">{post.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      </AuthenticatedLayout>

      
  );
}

export default Edit;