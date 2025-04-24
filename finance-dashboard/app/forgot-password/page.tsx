'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import { Wallet } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call your API to send password reset email
      // await resetPassword(email)

      // For now, just simulate a successful request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);
      toast({
        title: 'Email enviado',
        description:
          'Instruções para redefinir sua senha foram enviadas para seu email.',
      });
    } catch (error) {
      console.error('Password reset request failed:', error);
      toast({
        title: 'Erro',
        description:
          'Não foi possível enviar o email de redefinição. Por favor, tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-emerald-100 p-3">
              <Wallet className="h-6 w-6 text-emerald-700" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Esqueceu sua senha?
          </CardTitle>
          <CardDescription>
            {!isSubmitted
              ? 'Digite seu email e enviaremos instruções para redefinir sua senha'
              : 'Verifique seu email para instruções de redefinição de senha'}
          </CardDescription>
        </CardHeader>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Enviar instruções'}
              </Button>
              <div className="text-center text-sm">
                <Link
                  href="/signin"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Voltar para o login
                </Link>
              </div>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-green-50 p-4 text-green-700 text-center">
              <p>
                Um email com instruções para redefinir sua senha foi enviado
                para {email}.
              </p>
            </div>
            <div className="text-center mt-4">
              <Link
                href="/signin"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Voltar para o login
              </Link>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
