import Charts from '@/components/Charts';
import Navbar from '@/components/Navbar';
import Reports from '@/components/Reports';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen gap-10">
      <Navbar />
      <Reports />
      <Charts />
    </div>
  );
}
