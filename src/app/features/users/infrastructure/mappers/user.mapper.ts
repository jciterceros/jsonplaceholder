import type { UserApiItem, UserSummary } from '../../domain/entities/user.entity';

export function mapUserApiItemToSummary(user: UserApiItem): UserSummary {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    website: user.website,
    street: user.address.street,
    suite: user.address.suite,
    city: user.address.city,
    zipcode: user.address.zipcode,
    lat: user.address.geo.lat,
    lng: user.address.geo.lng,
    companyName: user.company.name,
    companyCatchPhrase: user.company.catchPhrase,
    companyBs: user.company.bs,
  };
}
