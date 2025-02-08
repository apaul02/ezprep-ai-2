'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Eye, EyeOff, Lock } from 'lucide-react'

function SettingsPage() {
  const [avatarPreview, setAvatarPreview] = useState('/images/avatar-1.jpg')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-[#fcf3e4]/50">
      <Card className="max-w-2xl mx-auto p-6 space-y-8 bg-amber-50/90 backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-center mb-8 text-amber-900">Account Settings</h1>
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-amber-100 shadow-sm">
            <Image 
              src={avatarPreview}
              alt="Profile Avatar"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
              id="avatar-upload"
              aria-label="Upload profile picture"
            />
            <Label 
              htmlFor="avatar-upload"
              className="cursor-pointer inline-flex items-center gap-2 bg-amber-600 text-amber-50 px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              <Lock className="w-4 h-4" />
              Change Avatar
            </Label>
          </div>
        </div>

        {/* Form Fields */}
        <form className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="username" className="text-amber-900">Username</Label>
            <Input 
              id="username"
              type="text"
              placeholder="@username"
              className="w-full bg-white/80 focus-visible:ring-amber-300"
            />
          </div>

          <div className="space-y-4">
            <Label htmlFor="email" className="text-amber-900">Email</Label>
            <Input 
              id="email"
              type="email"
              placeholder="your.email@example.com"
              className="w-full bg-white/80 focus-visible:ring-amber-300"
            />
          </div>

          <div className="space-y-4">
            <Label htmlFor="phone" className="text-amber-900">Phone Number</Label>
            <Input 
              id="phone"
              type="tel"
              placeholder="+91 9005678900"
              className="w-full bg-white/80 focus-visible:ring-amber-300"
            />
          </div>

          <div className="space-y-4">
            <Label htmlFor="current-password" className="text-amber-900">Current Password</Label>
            <div className="relative">
              <Input 
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-white/80 focus-visible:ring-amber-300 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500 hover:text-amber-600"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-amber-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-amber-900">Change Password</h2>
              <Button 
                variant="link" 
                className="text-amber-600 hover:text-amber-700 px-0"
                type="button"
              >
                Reset Password
              </Button>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="new-password" className="text-amber-900">New Password</Label>
                <div className="relative">
                  <Input 
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-white/80 focus-visible:ring-amber-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500 hover:text-amber-600"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="confirm-password" className="text-amber-900">Confirm New Password</Label>
                <div className="relative">
                  <Input 
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-white/80 focus-visible:ring-amber-300 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500 hover:text-amber-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end pt-6">
            <Button 
              variant="outline" 
              type="reset"
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              Reset Changes
            </Button>
            <Button 
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-amber-50"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default SettingsPage